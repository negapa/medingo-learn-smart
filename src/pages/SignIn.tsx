import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for hardcoded test account
    if (formData.username === 'test' && formData.password === 'testpass') {
      const testUserData = {
        username: 'test',
        email: 'test@medingo.com',
        major: 'Medicine (MD)',
        semester: '3rd Semester',
        university: 'Medingo University',
        studentId: 'TEST123',
        xp: 150,
        streak: 3,
        level: 2,
        completedLessons: ['pulmonary_hypertension_1'],
        selectedSubjects: ['lungs_basics', 'pharmacology', 'pathology', 'anatomy'],
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      
      login(testUserData);
      navigate('/dashboard');
      return;
    }
    
    // For regular users, you could add real authentication here
    // For now, just navigate to sign up if credentials don't match test account
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-foreground">Medingo</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to continue your learning journey</p>
        </div>

        {/* Sign In Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Username</label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={!formData.username || !formData.password}
              >
                Sign In
              </Button>
            </form>

            {/* Test Account Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Test account credentials:</p>
                <div className="text-xs text-muted-foreground mt-1">
                  Username: <code className="bg-muted px-1 rounded">test</code> | 
                  Password: <code className="bg-muted px-1 rounded">testpass</code>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  setFormData({ username: 'test', password: 'testpass' });
                }}
              >
                Use Test Credentials
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;