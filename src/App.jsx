import React, { useEffect, useState } from "react";

async function fetchProducts() {
  const url = 'products.json';
  const response = await fetch(url);
  return response.json();
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [category, setCategory] = useState("All");
  const [term, setTerm] = useState("");

  useEffect(() => {
    (async () => {
      const newProducts = await fetchProducts();
      setProducts(newProducts);
      setFilteredProduct(newProducts);
    })();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    


    const filtered = category === "All" 
    ? products.filter(product => product.name.toLowerCase().includes(term.toLowerCase()))
    : products.filter(product => product.type === category && product.name.toLowerCase().includes(term.toLowerCase()));

    setFilteredProduct(filtered);

  }

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select
                id="category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <option value="All">All</option>
                <option value="vegetables">Vegetables</option>
                <option value="meat">Meat</option>
                <option value="soup">Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="e.g. beans"
                value={term}
                onChange={(event) => setTerm(event.target.value)}
              />
            </div>
            <div>
              <button type="submit">Filter results</button>
            </div>
          </form>
        </aside>

        <main>
          {filteredProduct.map(product => (
            <section key={product.name} className={product.type}>
              <h2 className={product.type}>
                {product.name[0].toUpperCase()}
                {product.name.slice(1)}
                </h2>
              <p>${product.price}</p>
              <img src={product.image} alt={product.name} />
            </section>
          ))}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}
