class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // BUILD QUERY

    // 1A) Filtering
    const queryObj = { ...this.queryString }; // new hard copy
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // {difficulty:"easy",duration:{$gte:5}}

    // const query = await Tour.find(queryObj);  original Jonas course first part video
    this.query = this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // default
    }
    return this;
  }

  limitFields() {
    // 3) Field Limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // default
    }
    return this;
  }

  paginate() {
    // 4) Pagination
    const page = this.queryString.page * 1 || 1; // default is : 1
    const limit = this.queryString.limit * 1 || 100; // default is : 100
    const skip = (page - 1) * limit;

    // page=2&limit=10 //1-10 -> page 1 | 11-20 -> page  2 |
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
