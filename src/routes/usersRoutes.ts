import UserRepository, { UserAttributes, UserCreationAttributes } from "../data-access/inMemory/repositories/UserRepository";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

router.get("/", async (_req: Request, res: Response): Promise<Response> => {
    try {
        const users: Array<UserAttributes> = await UserRepository.findAll();
        return res.json(users);
    } catch (error) {
        return res.status(400);
    }
})

router.get("/:id", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const users = await UserRepository.findById(id);
        return res.json(users);
    } catch (error) {
        return res.status(400);
    }
})

router.post("/",
    body("first_name").isString(),
    body("last_name").isString(),
    body("email").isEmail(),
    body("password").isString(),
    body("is_active").isBoolean(),
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("error");

                return res.status(400).json({ errors: errors.array() });
            }
            console.log("no error");
            const data: UserCreationAttributes = req.body;
            const user = await UserRepository.create(data);
            return res.json(user);
        } catch (error) {
            return res.status(400);
        }
    })

router.put("/:id",
    body("first_name").isString(),
    body("last_name").isString(),
    body("email").isEmail(),
    body("password").isString(),
    body("is_active").isBoolean(), 
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("error");
                return res.status(400).json({ errors: errors.array() });
            }
            const id = req.params.id;
            const data: UserCreationAttributes = req.body;
            const user = await UserRepository.update(id, data);
            return res.json(user);
        } catch (error) {
            return res.status(400);
        }
    })

router.delete("/:id", async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const user = await UserRepository.delete(id);
        return res.json(user);
    } catch (error) {
        return res.status(400);
    }
})

export default router;