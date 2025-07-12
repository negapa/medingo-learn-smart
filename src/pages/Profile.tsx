import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Stethoscope, Trophy, Flame, Star, ArrowLeft, LogOut, Settings } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import subjectsData from '@/data/subjects.json';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const selectedSubjects = subjectsData.subjects.filter(subject => 
    user.selectedSubjects.includes(subject.id)
  );

  const totalLessons = selectedSubjects.reduce((total, subject) => total + subject.totalLessons, 0);
  const completedLessons = user.completedLessons.length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Profile</span>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* User Info */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{user.username}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Academic Info</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Major:</span> {user.major}</p>
                    <p><span className="text-muted-foreground">Semester:</span> {user.semester}</p>
                    <p><span className="text-muted-foreground">University:</span> {user.university}</p>
                    {user.studentId && (
                      <p><span className="text-muted-foreground">Student ID:</span> {user.studentId}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Learning Stats</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Member since:</span> {new Date(user.lastActiveDate).toLocaleDateString()}</p>
                    <p><span className="text-muted-foreground">Subjects:</span> {user.selectedSubjects.length}</p>
                    <p><span className="text-muted-foreground">Last active:</span> {user.lastActiveDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-primary text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{user.xp}</div>
                <div className="text-primary-foreground/80">Total XP</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-accent text-white">
              <CardContent className="p-6 text-center">
                <Flame className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{user.streak}</div>
                <div className="text-accent-foreground/80">Day Streak</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-success text-white">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">Level {user.level}</div>
                <div className="text-secondary-foreground/80">Current Level</div>
              </CardContent>
            </Card>
            
            <Card className="border-completed">
              <CardContent className="p-6 text-center">
                <div className="w-8 h-8 bg-completed/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-completed font-bold">%</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{Math.round(overallProgress)}%</div>
                <div className="text-muted-foreground">Complete</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{completedLessons}/{totalLessons} lessons completed</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>

                <div className="grid gap-4">
                  {selectedSubjects.map((subject) => {
                    const subjectCompletedLessons = user.completedLessons.filter(lessonId => 
                      lessonId.startsWith(subject.id)
                    ).length;
                    const subjectProgress = (subjectCompletedLessons / subject.totalLessons) * 100;
                    
                    return (
                      <div key={subject.id} className="flex items-center gap-4">
                        <div className="text-2xl">{subject.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{subject.name}</span>
                            <span>{subjectCompletedLessons}/{subject.totalLessons}</span>
                          </div>
                          <Progress value={subjectProgress} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link to="/subjects">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Subjects
                  </Button>
                </Link>
                
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;