const imgbbAPIKey = "30b3dbd0a1d5ebbb00bb0be489129544";
interface Errors {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    errors: {
        fullName?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }
}

export const validate = ({ fullName, email, password, confirmPassword, errors }: Errors) => {
    if (fullName.trim().length < 6) {
        errors.fullName = "Full Name must be at least 6 characters";
    }
    if (!email.trim()) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords don't match";
    //regex validation for email 
    if (email && ! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Email is invalid";
    }
    if (password && password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

}

export async function uploadImageToImgbb(imageFile: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
            method: "POST",
            body: formData,
        }
    );
    const data = await response.json();
    if (data.success) {
        return data.data.url; 
    } else {
        throw new Error("Failed to upload image");
    }
}