import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Stethoscope, Plus, Edit, Trash2, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('subjects');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Medingo Admin</h1>
            <p className="text-muted-foreground">Content Management System</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-6">
              <SubjectsManager />
            </TabsContent>

            <TabsContent value="lessons" className="space-y-6">
              <LessonsManager />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsView />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

const SubjectsManager = () => {
  const [editingSubject, setEditingSubject] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Manage Subjects</h2>
        <Button onClick={() => setEditingSubject({ id: '', name: '', description: '', icon: '', color: '', totalLessons: 0, estimatedTime: '' })}>
          <Plus className="w-4 h-4 mr-2" />
          Add Subject
        </Button>
      </div>

      {editingSubject && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{editingSubject.id ? 'Edit Subject' : 'Add New Subject'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject ID</label>
                <Input placeholder="e.g., anatomy_basics" value={editingSubject.id} readOnly={!!editingSubject.id} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject Name</label>
                <Input placeholder="e.g., Anatomy - Basics" value={editingSubject.name} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon (Emoji)</label>
                <Input placeholder="🦴" value={editingSubject.icon} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Color Theme</label>
                <Input placeholder="anatomy" value={editingSubject.color} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Brief description of the subject" value={editingSubject.description} />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => {
                toast({ title: "Subject saved successfully!" });
                setEditingSubject(null);
              }}>
                <Save className="w-4 h-4 mr-2" />
                Save Subject
              </Button>
              <Button variant="outline" onClick={() => setEditingSubject(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subject List */}
      <div className="grid gap-4">
        {[
          { id: 'lungs_basics', name: 'Lungs - Basics', icon: '🫁', lessons: 5 },
          { id: 'anatomy_basics', name: 'Anatomy - Basics', icon: '🦴', lessons: 8 },
        ].map((subject) => (
          <Card key={subject.id} className="shadow-card">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{subject.icon}</div>
                <div>
                  <h3 className="font-semibold text-foreground">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">{subject.lessons} lessons</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setEditingSubject(subject)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const LessonsManager = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Manage Lessons</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">
            Lesson management interface - Create and edit lesson content, questions, and scenarios.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const AnalyticsView = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">156</div>
            <div className="text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">1,247</div>
            <div className="text-muted-foreground">Lessons Completed</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">89%</div>
            <div className="text-muted-foreground">Average Score</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Detailed analytics and usage patterns would be displayed here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;