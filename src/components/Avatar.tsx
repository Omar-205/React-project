interface AvatarProps {
    name: string;
}

function Avatar({ name }: AvatarProps) {
    const initials = name
        .split(" ") // split into words
        .map((n) => n[0]) // take first letter of each word
        .join("")
        .toUpperCase();

    return (
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
            {initials}
        </div>
    );
}

export default Avatar;
