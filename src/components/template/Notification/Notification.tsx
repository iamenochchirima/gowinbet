import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import withHeaderItem from '@/utils/hoc/withHeaderItem';
import Dropdown, { DropdownRef } from '@/components/ui/Dropdown';
import ScrollBar from '@/components/ui/ScrollBar';
import Spinner from '@/components/ui/Spinner';
import Badge from '@/components/ui/Badge';
import { IoCheckmarkDoneOutline } from 'react-icons/io5';
import { apiGetNotificationList, apiMarkAsRead, apiMarkAllAsRead } from '@/services/CommonService';
import useResponsive from '@/utils/hooks/useResponsive';
import NotificationToggle from './NotificationToggle';
import { NotificationItem, NotificationStatus } from '@/@types/notifications';
import { apiSearchOneToken } from '@/services/MagicTokensService';
import { useApp } from '@/store/appStore';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const notificationHeight = 'h-[280px]';

const _Notification = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [searchingTokens, setSearchingTokens] = useState<Record<string, boolean>>({});
  const { larger } = useResponsive();
  const { setSelectedMagicToken } = useApp();
  const notificationDropdownRef = useRef<DropdownRef>(null);

  const onNotificationOpen = async () => {
    await fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    if (notificationList.length === 0) {
      setLoading(true);
      try {
        const resp = await apiGetNotificationList();
        setNotificationList(resp);
        setNoResult(resp.length === 0);
      } catch (error) {
        console.error('Error fetching notifications', error);
        setNoResult(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = async (token: string, notificationId: string) => {
    setSearchingTokens((prev) => ({ ...prev, [notificationId]: true }));
    try {
      const response = await apiSearchOneToken(token);
      if (response?.tokens?.length > 0) {
        setSelectedMagicToken(response.tokens[0]);
        navigate('/dashboards/token-details');
      }
    } catch (error) {
      console.error('Error searching token', error);
    } finally {
      setSearchingTokens((prev) => ({ ...prev, [notificationId]: false }));
    }
  };

  const onMarkAllAsRead = async () => {
    try {
      await apiMarkAllAsRead();
      setNotificationList((prev) =>
        prev.map((item) => ({ ...item, readAt: Date.now(), status: 'SENT' as NotificationStatus }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read', error);
    }
  };

  const onMarkAsRead = async (id: string) => {
    try {
      await apiMarkAsRead(id);
      setNotificationList((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, readAt: Date.now(), status: 'SENT' as NotificationStatus } : item
        )
      );
    } catch (error) {
      console.error('Error marking notification as read', error);
    }
  };

  const unreadCount = notificationList.filter((item) => !item.readAt).length;

  return (
    <Dropdown
      ref={notificationDropdownRef}
      renderTitle={
        <NotificationToggle
          dot={unreadCount > 0}
          className={className}
        />
      }
      menuClass="min-w-[320px] md:min-w-[360px] max-w-[400px] bg-gray-900 rounded-lg shadow-lg"
      placement={larger.md ? 'bottom-end' : 'bottom'}
      onOpen={onNotificationOpen}
    >
      <Dropdown.Item variant="header">
        <div className="dark:border-gray-700 px-4 py-4 flex items-center justify-between">
          <h6 className="text-white font-semibold">Notifications</h6>
          <span className="text-gray-400">Unread ({unreadCount})</span>
        </div>
      </Dropdown.Item>
      <div className="flex justify-end bg-gray-950 py-2 px-4">
        <button
          onClick={onMarkAllAsRead}
          className="text-green-400 flex items-center gap-1 hover:text-green-300 transition-colors"
        >
          <IoCheckmarkDoneOutline size={18} />
          <span>Mark all as read</span>
        </button>
      </div>
      <ScrollBar className={classNames('overflow-y-auto', notificationHeight)}>
        {notificationList.length > 0 &&
          notificationList.map((item, index) => (
            <div key={item._id} className="px-4 py-2">
              <div
                className="relative border border-gray-700 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => onMarkAsRead(item._id)}
              >
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-green-300 capitalize">
                      {item.notificationType.replace('_', ' ').toLowerCase()}
                    </span>
                    {!item.readAt && (
                      <Badge
                        className="absolute top-2 right-2"
                        innerClass="bg-primary w-2 h-2 rounded-full"
                      />
                    )}
                  </div>
                  <div className="text-gray-200 text-sm">
                    {item.tokenAddress && (
                      <span
                        className={classNames(
                          'text-green-400 hover:text-green-300 font-mono text-xs mr-1',
                          searchingTokens[item._id] ? 'opacity-50' : 'cursor-pointer'
                        )}
                        style={{ overflowWrap: 'break-word' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.tokenAddress && !searchingTokens[item._id]) {
                            handleSearch(item.tokenAddress, item._id);
                          }
                        }}
                      >
                        {searchingTokens[item._id] ? (
                          <Spinner className="inline-block mr-1" size={14} />
                        ) : (
                          item.tokenAddress
                        )}
                      </span>
                    )}
                    {item.message}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.createdAtDate
                      ? format(new Date(item.createdAtDate), 'MMM dd, yyyy HH:mm')
                      : item.createdAt
                        ? format(new Date(item.createdAt), 'MMM dd, yyyy HH:mm')
                        : 'Unknown date'}
                  </div>
                </div>
              </div>
              {index < notificationList.length - 1 && (
                <div className="border-t border-gray-700 my-2" />
              )}
            </div>
          ))}
        {loading && (
          <div className={classNames('flex items-center justify-center', notificationHeight)}>
            <Spinner size={40} />
          </div>
        )}
        {noResult && notificationList.length === 0 && (
          <div className={classNames('flex items-center justify-center', notificationHeight)}>
            <div className="text-center text-gray-200">
              <h6 className="font-semibold">No notifications!</h6>
              <p className="mt-1 text-sm">Please try again later</p>
            </div>
          </div>
        )}
      </ScrollBar>
    </Dropdown>
  );
};

const Notification = withHeaderItem(_Notification);

export default Notification;