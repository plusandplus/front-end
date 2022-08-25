// 인자로 받은 날짜와 오늘 날짜를 비교
// 받은 날짜가 오늘 날짜보다 앞이면(지났으면) false,
// 뒤면(안 지났으면) true 리턴

export const compareDates = (inputDate: string) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const todayDate = `${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;

  return inputDate >= todayDate;
};
