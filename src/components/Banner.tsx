function Banner() {
  return (
    <div className="banner">
      <img src={`${import.meta.env.BASE_URL}img/banner.jpg`} alt="К весне готовы!" />
      <h2 className="banner__header">К весне готовы!</h2>
    </div>
  );
}

export default Banner;