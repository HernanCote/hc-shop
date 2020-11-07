import React from 'react'
import { Helmet } from 'react-helmet';

const Meta = ({
  title = "Welcome to ProShop",
  description = "We sell the best products for cheap",
  keywords = "electronics, buy electronics, cheap electronics"
}) => (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );


export default Meta;
