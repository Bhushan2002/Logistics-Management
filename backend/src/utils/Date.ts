import moment from "moment";
export const formatDate = (date: string) => moment(date).format("YYYY-MM-DD");
