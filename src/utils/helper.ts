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
    // Full Name Validation
    if (!fullName.trim()) {
        errors.fullName = "Full Name is required";
    } else if (fullName.trim().length < 6) {
        errors.fullName = "Full Name must be at least 6 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
        errors.fullName = "Full Name must only contain letters";
    } else if (fullName.trim().split(" ").length < 2) {
        errors.fullName = "Please enter both first and last name";
    }

    // Email Validation
    if (!email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email address";
    }

    // Password Validation
    if (!password) {
        errors.password = "Password is required";
    } else {
        if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(password)) {
            errors.password = "Password must contain at least one uppercase letter (A-Z)";
        }
        if (!/[a-z]/.test(password)) {
            errors.password = "Password must contain at least one lowercase letter (a-z)";
        }
        if (!/[0-9]/.test(password)) {
            errors.password = "Password must contain at least one number (0-9)";
        }
        if (/\s/.test(password)) {
            errors.password = "Password cannot contain spaces";
        }
    }

    // Confirm Password Validation
    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }
};


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

export function getToady() {
    return new Date().toISOString().split("T")[0];
}