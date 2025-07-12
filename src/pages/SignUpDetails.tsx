import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const SignUpDetails = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    major: '',
    semester: '',
    university: '',
    studentId: '',
  });

  useEffect(() => {
    // Check if we have temporary signup data
    const tempData = localStorage.getItem('medingo_signup_temp');
    if (!tempData) {
      navigate('/signup');
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the temporary signup data
    const tempData = localStorage.getItem('medingo_signup_temp');
    if (!tempData) {
      navigate('/signup');
      return;
    }

    const signupData = JSON.parse(tempData);
    
    // Combine signup data with details
    const userData = {
      ...signupData,
      ...formData,
    };

    // Create user account
    login(userData);
    
    // Clear temporary data
    localStorage.removeItem('medingo_signup_temp');
    
    // Navigate to subject selection
    navigate('/subjects');
  };

  const majors = [
    'Medicine (MD)',
    'Pharmacy (PharmD)',
    'Nursing (BSN)',
    'Dentistry (DDS)',
    'Veterinary Medicine',
    'Biomedical Sciences',
    'Public Health',
    'Other'
  ];

  const semesters = [
    '1st Semester',
    '2nd Semester', 
    '3rd Semester',
    '4th Semester',
    '5th Semester',
    '6th Semester',
    '7th Semester',
    '8th Semester',
    'Graduate Student',
    'Resident'
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-foreground">Medingo</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Tell us about yourself</h1>
          <p className="text-muted-foreground">Help us personalize your learning experience</p>
        </div>

        {/* Details Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-center">Academic Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Major</label>
                <Select value={formData.major} onValueChange={(value) => handleInputChange('major', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your major" />
                  </SelectTrigger>
                  <SelectContent>
                    {majors.map((major) => (
                      <SelectItem key={major} value={major}>
                        {major}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Current Semester</label>
                <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">University/Institution</label>
                <Input
                  type="text"
                  placeholder="Enter your university name"
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Student ID (Optional)</label>
                <Input
                  type="text"
                  placeholder="Enter your student ID"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="h-12"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!formData.major || !formData.semester || !formData.university}
              >
                Complete Registration
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-2 bg-completed rounded-full"></div>
            <div className="w-8 h-2 bg-primary rounded-full"></div>
            <div className="w-8 h-2 bg-border rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpDetails;