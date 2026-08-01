"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// import { createRentalRequestAction } from "@/actions/rental/createRentalRequest";
import {
    rentalRequestSchema,
    RentalRequestFormData,
} from "@/schemas/rentalRequest.schema";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { createRentalRequest } from "@/services/rental/rentalRequest";

type Props = {
    propertyId: string;
};

export default function RequestToRentModal({
    propertyId,
}: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<RentalRequestFormData>({
        resolver: zodResolver(rentalRequestSchema),
        defaultValues: {
            moveInDate: "",
        },
    });

    const moveInDate = watch("moveInDate");

    const onSubmit = (data: RentalRequestFormData) => {
        startTransition(async () => {
            const result = await createRentalRequest({
                propertyId,
                moveInDate: data.moveInDate,
            });

            if (result.success) {
                toast.success(result.message);

                reset();

                setOpen(false);
            } else {
                toast.error(
                    result.message || "Failed to submit request."
                );
            }
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger render={
                <Button className="w-full">
                    Request to Rent
                </Button>
            } />

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Request to Rent
                    </DialogTitle>

                    <DialogDescription>
                        Select your preferred move-in date and
                        submit your rental request.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <Label>Move-in Date</Label>

                        <Popover>
                            <PopoverTrigger render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !moveInDate &&
                                        "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />

                                    {moveInDate ? (
                                        format(
                                            new Date(moveInDate),
                                            "PPP"
                                        )
                                    ) : (
                                        <span>Select a date</span>
                                    )}
                                </Button>
                            } />

                            <PopoverContent
                                align="start"
                                className="w-auto p-0"
                            >
                                <Calendar
                                    mode="single"
                                    selected={
                                        moveInDate
                                            ? new Date(moveInDate)
                                            : undefined
                                    }
                                    onSelect={(date) => {
                                        if (!date) return;

                                        setValue(
                                            "moveInDate",
                                            format(date, "yyyy-MM-dd"),
                                            {
                                                shouldValidate: true,
                                            }
                                        );
                                    }}
                                    disabled={(date) => {
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);

                                        return date < today;
                                    }}
                                />
                            </PopoverContent>
                        </Popover>

                        {errors.moveInDate && (
                            <p className="text-sm text-destructive">
                                {errors.moveInDate.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                reset();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Request"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}