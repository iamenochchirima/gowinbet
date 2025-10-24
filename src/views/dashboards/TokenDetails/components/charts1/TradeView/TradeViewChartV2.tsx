import { useEffect, useRef } from 'react';
import Datafeed from './datafeed';
import { useApp } from '@/store/appStore';
import { widget, ChartingLibraryWidgetOptions, LanguageCode, ResolutionString } from '../../../../../../charting_library';
import { BASE_URL } from '@/constants/api.constant';

// Define a more accurate type for the TradingView widget
interface TradingViewWidget {
	remove: () => void;
	onChartReady: (callback: () => void) => void;
	activeChart: () => {
		setResolution: (resolution: string) => void;
	};
}

export interface ChartContainerProps {
	symbol: ChartingLibraryWidgetOptions['symbol'];
	interval: ChartingLibraryWidgetOptions['interval'];

	// BEWARE: no trailing slash is expected in feed URL
	datafeedUrl: string;
	libraryPath: ChartingLibraryWidgetOptions['library_path'];
	chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
	chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
	clientId: ChartingLibraryWidgetOptions['client_id'];
	userId: ChartingLibraryWidgetOptions['user_id'];
	fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
	autosize: ChartingLibraryWidgetOptions['autosize'];
	studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
	container: ChartingLibraryWidgetOptions['container'];
}

const getLanguageFromURL = (): LanguageCode | null => {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
};


const CryptoChart = () => {
	const { selectedMagicToken } = useApp();
	const chartContainerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

	if (!selectedMagicToken || !selectedMagicToken.metadata) {
		return <div className="text-white">No token selected</div>;
	}


	const symbol = selectedMagicToken.metadata.symbol
	const defaultProps: Omit<ChartContainerProps, 'container'> = {
		symbol,
		interval: '1' as ResolutionString,
		datafeedUrl: 'http://localhost:5000/api/tradeview',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'magicvest.ai',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,

		studiesOverrides: {},
	};

	useEffect(() => {
		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: defaultProps.symbol as string,
			datafeed: new Datafeed(`${BASE_URL}/tradeview`),
			interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
			container: chartContainerRef.current,
			library_path: defaultProps.libraryPath as string,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: defaultProps.chartsStorageUrl,
			charts_storage_api_version: defaultProps.chartsStorageApiVersion,
			client_id: defaultProps.clientId,
			user_id: defaultProps.userId,
			theme: 'dark',
			fullscreen: defaultProps.fullscreen,
			autosize: defaultProps.autosize,
			studies_overrides: defaultProps.studiesOverrides,
			timeframe: '1D', // Set default time range to 1 month
		};

		const tvWidget = new widget(widgetOptions);

		tvWidget.onChartReady(() => {
			// Optionally, force the chart to a specific time range
			tvWidget.activeChart().setVisibleRange({
				from: Math.floor((Date.now() / 1000) - 30 * 24 * 60 * 60), // 30 days ago
				to: Math.floor(Date.now() / 1000), // Now
			});
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () =>
					tvWidget.showNoticeDialog({
						title: 'Notification',
						body: 'TradingView Charting Library API works correctly',
						callback: () => {
							console.log('Noticed!');
						},
					})
				);
				button.innerHTML = 'Check API';
			});
		});

		return () => {
			tvWidget.remove();
		};
	}, [defaultProps.symbol]); // Add dependency to re-render if symbol changes

	return (
		<div className="relative bg-[#292C2D] p-4 rounded-lg w-full h-full">
			<div ref={chartContainerRef} className="w-full h-[700px]" /> {/* Increased height from 400px to 700px */}
		</div>
	);
};

export default CryptoChart;