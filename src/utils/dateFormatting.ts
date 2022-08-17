// 날짜데이터를 yyyy-MM-dd 형식으로 변환
export const dateFormatting = (eventDate: Date) => {
  let year = eventDate.getFullYear();
  let month = eventDate.getMonth() + 1;
  let date = eventDate.getDate();

  let formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;

  return formattedDate;
};
