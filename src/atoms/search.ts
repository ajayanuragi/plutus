import { atomWithStorage } from 'jotai/utils';
import { DataProp } from '@/types/SearchTypes';
export const latestSearchAtom = atomWithStorage<string>('latestSearch', '');
export const latestResultAtom = atomWithStorage<DataProp | null>('latestResult', null);
