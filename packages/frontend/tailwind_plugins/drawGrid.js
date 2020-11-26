// eslint-disable-next-line no-undef
module.exports = ({ addComponents, theme, e }) => {
  //Function that converts an object into an array of objects
  //Move this to shared utils later.
  const mapObj = (obj, callback) => {
    const arr = [];
    for (const [key, value] of Object.entries(obj)) {
      arr.push({ key, value });
    }
    return arr.map((o, i) => callback(o, i));
  };
  //--------------------------------

  const getGridStyles = (color, spacing) => {
    return {
      backgroundImage: `repeating-linear-gradient( 0deg, ${color} 0 1px, transparent 1px 100% ),repeating-linear-gradient( 90deg, ${color} 0 1px, transparent 1px 100% )`,
      backgroundSize: `${spacing} ${spacing}`,
    };
  };

  const components = mapObj(theme("spacing"), ({ key, value }) => {
    return {
      [`.${e(`draw-grid-${key}`)}`]: getGridStyles(
        theme("colors.blue.500"),
        value
      ),
    };
  });

  addComponents([
    { ".draw-grid": getGridStyles(theme("colors.blue.500"), "4rem") },
    ...components,
  ]);
};
