export const numberWithCommas = (
  x: number | undefined,
  { userTyping, input }: any,
  minimumFractionDigits: number = 2,
) => {
  if (userTyping) {
    return input
  }
  const options = {
    minimumFractionDigits: minimumFractionDigits,
  }
  return Number(x).toLocaleString('en', options)
}
