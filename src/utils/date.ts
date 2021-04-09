import moment from "moment"

export function fromNow(date: string | Date) {
  return moment(date).fromNow()
}

export function formatDate(date: string | Date) {
  return moment(date).fromNow()
}

export function getDateFmt(date: Date) {
  return moment(date).format("YYYY-MM-DD")
}
