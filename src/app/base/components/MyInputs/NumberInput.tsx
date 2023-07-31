export const numberWithCommas = (
  x: number | undefined,
  { userTyping, input }: any,
  maximumFractionDigits: number = 2,
) => {
  if (userTyping) {
    return input
  }
  const options = {
    minimumFractionDigits: maximumFractionDigits,
  }
  return Number(x).toLocaleString('en', options)
}
