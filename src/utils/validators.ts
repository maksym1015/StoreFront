export default {
  minLength(minLength: number) {
    return (value: string) => {
      return (value || '').length >= minLength;
    };
  },

  maxLength(maxLength: number) {
    return (value: string) => {
      return (value || '').length <= maxLength;
    };
  },

  noneEmptyArr(value: any) {
    return Array.isArray(value) && value.length > 0;
  },

  required(value: any) {
    return !!value;
  },
};
