const  getRandomLightHexColor = () => {
  // Tạo màu sáng bằng cách random RGB từ 128 đến 255 (vì 0–127 thường là màu tối)
  const getComponent = () => Math.floor(Math.random() * 128) + 128;

  const r = getComponent();
  const g = getComponent();
  const b = getComponent();

  // Chuyển sang hex và pad nếu cần
  const toHex = c => c.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export {getRandomLightHexColor}