export const CONFIRM_USECASE = Symbol("confirm member usecase");

export default interface ConfirmUsecase {
    excute(id: number): Promise<void>;
}