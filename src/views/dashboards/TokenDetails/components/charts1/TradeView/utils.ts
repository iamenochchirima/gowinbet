import { MagicToken } from "@/@types/tokens";
import { HistoryResponse } from "@/@types/tradeview";
import { Bar } from "@/charting_library/datafeed-api";

  export const transformResponseToBars = (data: HistoryResponse): Bar[] => {
    if (!data.t || data.t.length === 0) {
      console.warn('No timestamp data provided in HistoryResponse');
      return [];
    }
  
    const arrays = [data.t, data.o, data.h, data.l, data.c, data.v];
    const length = data.t.length;
    if (!arrays.every(arr => arr.length === length)) {
      console.error('Mismatched array lengths in HistoryResponse:', {
        t: data.t.length,
        o: data.o.length,
        h: data.h.length,
        l: data.l.length,
        c: data.c.length,
        v: data.v.length
      });
      return [];
    }

  
    const bars = data.t.map((time, index) => {
      if (typeof time !== 'number' || time <= 0) {
        console.warn(`Invalid timestamp at index ${index}: ${time}`);
        return null;
      }
  
      const val = {
        time: time, 
        open: data.o[index],
        high: data.h[index],
        low: data.l[index],
        close: data.c[index],
        volume: data.v && typeof data.v[index] === 'number' ? data.v[index] : undefined,
      };
      return val;
    });
  
    // Filter out any null bars due to invalid timestamps
    const validBars = bars.filter((bar): bar is Exclude<typeof bar, null> => bar !== null);

    if (validBars.length !== bars.length) {
      console.warn(`Filtered out ${bars.length - validBars.length} invalid bars`);
    }

    return validBars;
  }

  export const getSelectedTokenFromStorage = (): MagicToken | null => {
  try {
    const sessionTokens = localStorage.getItem('sessionTokens');
    if (!sessionTokens) {
      return null;
    }
    
    const parsedData = JSON.parse(sessionTokens);
    return parsedData?.state?.selectedMagicToken || null;
  } catch (error) {
    console.error('Error parsing selected token from localStorage:', error);
    return null;
  }
};