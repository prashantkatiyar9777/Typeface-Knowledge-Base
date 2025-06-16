export const commonStyles = {
  fontFamily: 'font-sans',
  text: {
    xs: 'text-xs font-sans',
    sm: 'text-sm font-sans',
    base: 'text-base font-sans',
    lg: 'text-lg font-sans',
    xl: 'text-xl font-sans',
    '2xl': 'text-2xl font-sans',
    '3xl': 'text-3xl font-sans',
    '4xl': 'text-4xl font-sans',
  },
  heading: {
    h1: 'text-4xl font-sans font-bold',
    h2: 'text-3xl font-sans font-bold',
    h3: 'text-2xl font-sans font-bold',
    h4: 'text-xl font-sans font-bold',
    h5: 'text-lg font-sans font-bold',
    h6: 'text-base font-sans font-bold',
  },
  weight: {
    thin: 'font-thin font-sans',
    extralight: 'font-extralight font-sans',
    light: 'font-light font-sans',
    normal: 'font-normal font-sans',
    medium: 'font-medium font-sans',
    semibold: 'font-semibold font-sans',
    bold: 'font-bold font-sans',
    extrabold: 'font-extrabold font-sans',
    black: 'font-black font-sans',
  },
  input: {
    base: 'font-family-suisse block w-full border border-gray-300 text-sm px-3 py-2 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed',
  },
  button: {
    base: 'px-4 py-2 font-sans transition-colors duration-200 border',
    primary: 'bg-[#FAF7F6] text-[#111013] border-[#FAF7F6] hover:bg-[#F3F3F4]',
    secondary: 'bg-[#F3F3F4] text-[#111013] border-[#F3F3F4] hover:bg-[#E9E9EA]',
    disabled: 'opacity-50 cursor-not-allowed',
  },
  container: {
    base: 'bg-white border border-gray-200',
    dropdown: 'absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200',
    modal: 'relative z-50 w-full bg-white',
    card: 'bg-white border border-gray-200',
  }
}; 