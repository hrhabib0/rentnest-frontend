import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type PropertyLandlordProps = {
    landlord: {
        name: string;
        email: string;
        profilePhotoUrl: string | null;
        status: string;
    };
};

export default function PropertyLandlord({
    landlord,
}: PropertyLandlordProps) {
    return (
        <section className="space-y-5">
            <h2 className="text-2xl font-bold">
                Landlord
            </h2>

            <div className="flex items-center gap-5 rounded-2xl border p-6">
                <Avatar className="size-16">
                    <AvatarImage src={landlord.profilePhotoUrl ?? ""} />

                    <AvatarFallback>
                        {landlord.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                    <h3 className="text-lg font-semibold">
                        {landlord.name}
                    </h3>

                    <p className="text-muted-foreground">
                        {landlord.email}
                    </p>

                    <Badge variant="secondary">
                        {landlord.status}
                    </Badge>
                </div>
            </div>
        </section>
    );
}