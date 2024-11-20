export default function URLConverter(name) {
  return name?.toLowerCase()?.replace(/\s+/g, "-");
}
