import JsonObject from '../types/JsonObject';
import get from 'lodash/get';

export default function getThemeValue(key: string) {
  return ({ theme }: { theme: JsonObject }) => {
    return get(theme, key);
  };
}
