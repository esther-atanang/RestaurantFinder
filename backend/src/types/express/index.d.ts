export { }

declare global {
    namespace Express{
        interface Response <T> {
            status: "error" | "success",
            message: string,
            data?: T
        }
    }
}