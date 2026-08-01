import { z } from "zod";

export const rentalRequestSchema = z.object({
    moveInDate: z.string().min(1, "Move-in date is required"),
});

export type RentalRequestFormData = z.infer<
    typeof rentalRequestSchema
>;