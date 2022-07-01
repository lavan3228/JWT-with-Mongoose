import express from "express";
import authorApiCalls from "../controllers/authorController";
import authenticateToken from "../middleware";

const router = express.Router();


router.get("/getAllAuthors", authenticateToken, authorApiCalls.allAuthors);
router.get("/getAuthor/:id",authenticateToken, authorApiCalls.getAuthor);
router.post("/createAuthor",authenticateToken, authorApiCalls.createAuthor);
router.put("/updateAuthor/:id",authenticateToken, authorApiCalls.updateAuthor);
router.delete("/deleteAuthor/:id",authenticateToken, authorApiCalls.deleteAuthor);

export = router;