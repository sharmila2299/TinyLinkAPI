import pool from "../db.js";

const insertLink = (code, url) => {
  return pool.query(
    `INSERT INTO links (code, target_url) 
     VALUES ($1, $2) 
     RETURNING *`,
    [code, url]
  );
};

const getAllLinks = () => {
  return pool.query(
    `SELECT * FROM links 
     ORDER BY created_at DESC`
  );
};

const getLinkByCode = (code) => {
  return pool.query(
    `SELECT * FROM links 
     WHERE code = $1`,
    [code]
  );
};

const deleteLinkByCode = (code) => {
  return pool.query(
    `DELETE FROM links 
     WHERE code = $1 
     RETURNING *`,
    [code]
  );
};

const updateClickStats = (code) => {
  return pool.query(
    `UPDATE links 
     SET total_clicks = total_clicks + 1, last_clicked = NOW() 
     WHERE code = $1 
     RETURNING *`,
    [code]
  );
};

export {
  insertLink,
  getAllLinks,
  getLinkByCode,
  deleteLinkByCode,
  updateClickStats,
};
