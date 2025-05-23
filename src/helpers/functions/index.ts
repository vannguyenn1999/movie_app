/* eslint-disable @typescript-eslint/no-explicit-any */

const getRandomLightHexColor = () => {
  // Tạo màu sáng bằng cách random RGB từ 128 đến 255 (vì 0–127 thường là màu tối)
  const getComponent = () => Math.floor(Math.random() * 128) + 128;

  const r = getComponent();
  const g = getComponent();
  const b = getComponent();

  // Chuyển sang hex và pad nếu cần
  const toHex = c => c.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ? Chuyển đổi thời gian từ "YYYY-MM-DD" thành "DD-MM-YYYY"
const convertTime = (time: string) => {
  const dateObj = new Date(time);

  // Lấy ngày, tháng, năm
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = dateObj.getFullYear();

  // Ghép lại theo định dạng dd-mm-yyyy
  return `${day}-${month}-${year}`;
}

const findNameBySlug = (data: any, key: string) => {
  const result = data.find((item: any) => item.slug === key);
  return result?.title ? result?.title : result?.name
}

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Hiển thị 24h (bỏ đi nếu muốn hiển thị AM/PM)
  }).format(date);
};

const isNotEmpty = (obj: unknown) => {
  return obj !== undefined && obj !== null && obj !== ''
}

export { getRandomLightHexColor, convertTime, findNameBySlug, formatDate, isNotEmpty }