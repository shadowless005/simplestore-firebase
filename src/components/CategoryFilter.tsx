interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  categories,
}: CategoryFilterProps) => {
  return (
    <div className="category-filter">
      <div className="control-label">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <circle cx="9" cy="6" r="2" />

          <line x1="4" y1="12" x2="20" y2="12" />
          <circle cx="15" cy="12" r="2" />

          <line x1="4" y1="18" x2="20" y2="18" />
          <circle cx="11" cy="18" r="2" />
        </svg>

        <label htmlFor="category">Filter by category:</label>
      </div>

      <select
        id="category"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="all">All Categories</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
