interface Profile {
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
}

let profileData: Profile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  joinDate: 'January, 2022',
  fitnessLevel: 'moderate',
  gender: '',
  bio: 'Passionate about fitness and healthy living. Looking to lose some weight and build lean muscle.',
  primaryGoals: '',
  activityLevel: '',
  age: 30,
  height: 180,
  weight: 75,
  bmi: 23.1,
  targetWeight: 70
};

export default profileData;
