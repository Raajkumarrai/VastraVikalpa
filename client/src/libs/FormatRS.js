export default function formatRS(number) {
  const formattedNumber = new Intl.NumberFormat("en-IN").format(number);
  return `₨ ${formattedNumber}`;
}
