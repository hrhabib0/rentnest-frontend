import {
    Pencil,
    Trash2,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CreateCategoryDialog from "./CreateCategoryDialog";
import EditCategoryDialog from "./EditCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";


type TCategory = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

type Props = {
    categories: TCategory[];
};

export default function CategoriesTable({
    categories,
}: Props) {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    All Categories
                </h2>

                <CreateCategoryDialog />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="py-10 text-center text-muted-foreground"
                            >
                                No categories found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">
                                    {category.name}
                                </TableCell>

                                <TableCell className="max-w-md truncate">
                                    {category.description}
                                </TableCell>

                                <TableCell>
                                    {new Date(
                                        category.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-end gap-2">
                                        <EditCategoryDialog category={category} />

                                        <DeleteCategoryDialog categoryId={category.id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}