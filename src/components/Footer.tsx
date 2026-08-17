const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>
              <span className="brand-simple">Simple</span>
              <span className="footer-store">Store</span>
            </h2>

            <p>A simple, modern shopping experience built for convenience.</p>
          </div>

          <div className="footer-links">
            <h3>Shop</h3>

            <a href="/#products">Products</a>
            <a href="/#store-controls">Categories</a>
            <a href="/cart">Cart</a>
          </div>

          <div className="footer-info">
            <h3>SimpleStore</h3>

            <p>Shop Smarter. Shop Simple.</p>

            <p className="footer-tech">
              Built with React, TypeScript, Redux Toolkit, and React Query.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 SimpleStore. All rights reserved.</p>

          <p>Built as a modern e-commerce experience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
