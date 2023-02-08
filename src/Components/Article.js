const Article = ({ offer }) => {
  return (
    <div className="article column">
      <div className="article__user">
        {/* <img
          src={offer.owner.account.avatar.url}
          alt=""
          className="article__user__img"
        /> */}
        <span className="article__user__pseudo">
          {offer.owner.account.username}
        </span>
      </div>
      <div className="article__picture">
        <img src={offer.product_pictures[0].url} alt="" />
      </div>
      <div className="article__details">
        <div className="col">
          <div className="article__details__price">{offer.product_price}</div>
          <div className="article__details__price__taxes">
            {offer.product_price * 1.2}
          </div>
          <div className="article__details__size">
            {offer.product_details[1].TAILLE}
          </div>
          <div className="article__details__brand">
            {offer.product_details[0].MARQUE}
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Article;
