import { atomWithStorage } from 'jotai/utils';
import { MediaResult } from '@/types/MediaResultTypes';
export const latestMediaResult = atomWithStorage<MediaResult | null>('latestMedia', null);
