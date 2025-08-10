class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryParams = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "perPage", "fields"];

    excludeFields.forEach(q => delete queryParams[q]);

    const queryString = JSON.stringify(queryParams).replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("name price");
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const perPage = this.queryString.perPage * 1 || 100;

    const skip = (page - 1) * perPage;

    this.query = this.query.skip(skip).limit(perPage);
    return this;
  }
}

export default ApiFeatures;
