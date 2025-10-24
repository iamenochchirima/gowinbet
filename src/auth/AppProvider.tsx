import { useRef, useEffect, useState } from 'react'
import AppContext from './AppContext'
import type { ReactNode } from 'react'
import { StatsResponse } from '@/@types/tokens'
import { apiGetStats } from '@/services/MagicTokensService'
import { io, Socket } from 'socket.io-client'
import { BASE_URL2 } from '@/constants/api.constant'

type AppProviderProps = { children: ReactNode }

function AppProvider({ children }: AppProviderProps) {
  const [realtimeStats, setRealtimeStats] = useState<StatsResponse | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    getAppStats()
  }, [])

  const getAppStats = async () => {
    try {
      const res = await apiGetStats()
      if (res) {
        setRealtimeStats(res)
      } else {
        setRealtimeStats(null)
        console.error('Failed to fetch stats: No response')
      }
    } catch (error) {
      setRealtimeStats(null)
      console.error('Failed to fetch stats:', error)
    }
  }

  useEffect(() => {
    const newSocket = io(
      BASE_URL2,
      {
        withCredentials: true,
        transports: ["websocket"],
      }
    );

    setSocket(newSocket);

    newSocket.on("STATS_UPDATE", (message: StatsResponse) => {
      setRealtimeStats(message);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        getAppStats();
        console.log("Connected to server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }, [socket]);

  return (
    <AppContext.Provider
      value={{
        realtimeStats
      }}
    >
      {children}
    </AppContext.Provider>
  )
}


export default AppProvider
