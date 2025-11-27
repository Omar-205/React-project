interface IProfile {
  name: string;
  email: string;
  joinDate: string;
  fitnessLevel: string;
  gender: string;
  bio: string;
  primaryGoals: string;
  activityLevel: string;
  bmi: number;
  age: number;
  height: number;
  weight: number;
  targetWeight: number;
  birthDate: number;
}

let profileData: IProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinDate: 'January, 2022',
  birthDate: Date.now(),
  fitnessLevel: 'moderate',
  gender: 'male',
  bio: 'Passionate about fitness and healthy living. Looking to lose some weight and build lean muscle.',
  primaryGoals: '',
  activityLevel: '',
  height: 180,
  weight: 75,
  bmi: 23.1,
  targetWeight: 70,
  age: 30
};

export default profileData;
export function BMI(profileData: IProfile) {
  const { weight, height } = profileData;
  return weight / ((height / 100) * (height / 100));
}