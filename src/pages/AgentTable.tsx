import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Eye, Edit2, Trash2, Play, Pause, Mic, MicOff, X, Plus } from 'lucide-react';

// =====================================================================================
// 0. TYPES AND DUMMY DATA
// =====================================================================================

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  team: 'Assigned' | 'Unassigned';
  audioUrl?: string;
}

const initialAgents: Agent[] = [
  { id: '1', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '+1 (555) 012-3456', role: 'Sales Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', name: 'Arjun Sharma', email: 'arjun.sharma@example.com', phone: '+1 (555) 123-4567', role: 'Support Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', name: 'Kavita Singh', email: 'kavita.singh@example.com', phone: '+1 (555) 234-5678', role: 'Senior Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '4', name: 'Rohan Mehta', email: 'rohan.mehta@example.com', phone: '+1 (555) 345-6789', role: 'Sales Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '5', name: 'Anjali Gupta', email: 'anjali.gupta@example.com', phone: '+1 (555) 456-7890', role: 'Support Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },

  { id: '6', name: 'Neha Verma', email: 'neha.verma@example.com', phone: '+1 (555) 567-8901', role: 'Sales Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '7', name: 'Amit Joshi', email: 'amit.joshi@example.com', phone: '+1 (555) 678-9012', role: 'Support Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '8', name: 'Sneha Rao', email: 'sneha.rao@example.com', phone: '+1 (555) 789-0123', role: 'Senior Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '9', name: 'Vikram Malhotra', email: 'vikram.malhotra@example.com', phone: '+1 (555) 890-1234', role: 'Support Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '10', name: 'Divya Nair', email: 'divya.nair@example.com', phone: '+1 (555) 901-2345', role: 'Sales Lead', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },

  { id: '11', name: 'Rahul Iyer', email: 'rahul.iyer@example.com', phone: '+1 (555) 234-5670', role: 'Support Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '12', name: 'Pooja Batra', email: 'pooja.batra@example.com', phone: '+1 (555) 345-6781', role: 'Sales Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '13', name: 'Manish Kapoor', email: 'manish.kapoor@example.com', phone: '+1 (555) 456-7892', role: 'Support Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '14', name: 'Ritika Das', email: 'ritika.das@example.com', phone: '+1 (555) 567-8903', role: 'Senior Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '15', name: 'Karan Thakur', email: 'karan.thakur@example.com', phone: '+1 (555) 678-9014', role: 'Support Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },

  { id: '16', name: 'Meera Sinha', email: 'meera.sinha@example.com', phone: '+1 (555) 789-0125', role: 'Sales Lead', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '17', name: 'Siddharth Jain', email: 'siddharth.jain@example.com', phone: '+1 (555) 890-1236', role: 'Support Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '18', name: 'Nisha Kaul', email: 'nisha.kaul@example.com', phone: '+1 (555) 901-2347', role: 'Sales Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '19', name: 'Rajeev Bansal', email: 'rajeev.bansal@example.com', phone: '+1 (555) 123-4568', role: 'Support Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '20', name: 'Tanya Desai', email: 'tanya.desai@example.com', phone: '+1 (555) 234-5679', role: 'Senior Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },

  { id: '21', name: 'Harshita Menon', email: 'harshita.menon@example.com', phone: '+1 (555) 345-6780', role: 'Support Lead', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '22', name: 'Yash Khanna', email: 'yash.khanna@example.com', phone: '+1 (555) 456-7891', role: 'Sales Agent', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '23', name: 'Shruti Pillai', email: 'shruti.pillai@example.com', phone: '+1 (555) 567-8902', role: 'Support Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: '24', name: 'Gaurav Reddy', email: 'gaurav.reddy@example.com', phone: '+1 (555) 678-9013', role: 'Sales Lead', team: 'Assigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: '25', name: 'Ishita Roy', email: 'ishita.roy@example.com', phone: '+1 (555) 789-0124', role: 'Senior Agent', team: 'Unassigned', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];



// =====================================================================================
// 1. REUSABLE COMPONENTS (MODALS, AUDIO PLAYER/RECORDER)
// =====================================================================================

interface AudioRecorderProps {
  onSave: (audioBlob: Blob) => void;
  onCancel: () => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onSave, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onSave(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert("Microphone access denied. Please allow microphone access in your browser settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 p-4 bg-gray-50 rounded-lg">
      <div className="text-4xl font-mono text-gray-700">{formatTime(recordingTime)}</div>
      {isRecording && <div className="text-red-500 animate-pulse">Recording...</div>}
      <div className="flex space-x-4">
        {!isRecording ? (
          <button onClick={startRecording} className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
            <Mic className="w-5 h-5" /> <span>Start Recording</span>
          </button>
        ) : (
          <button onClick={stopRecording} className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
            <MicOff className="w-5 h-5" /> <span>Stop & Save</span>
          </button>
        )}
        <button onClick={onCancel} className="flex items-center space-x-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors">
          <X className="w-5 h-5" /> <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

const AudioPlayer: React.FC<{ audioUrl: string }> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      audio.addEventListener('play', onPlay);
      audio.addEventListener('pause', onPause);
      audio.addEventListener('ended', onPause);
      return () => {
        audio.removeEventListener('play', onPlay);
        audio.removeEventListener('pause', onPause);
        audio.removeEventListener('ended', onPause);
      };
    }
  }, []);

  return (
    <div className="flex items-center">
      <button onClick={togglePlay} className="flex items-center space-x-2 bg-[#0088FE] text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors">
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        <span>Listen</span>
      </button>
      <audio ref={audioRef} src={audioUrl} className="hidden" />
    </div>
  );
};


// =====================================================================================
// 2. MAIN AGENT TABLE COMPONENT (NOW THE TOP-LEVEL EXPORT)
// =====================================================================================

export default function AgentTable() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [viewingAgent, setViewingAgent] = useState<Agent | null>(null);
  const [filterTeam, setFilterTeam] = useState<string>('all');
  const [showRecorder, setShowRecorder] = useState(false);
  const [newAgentAudio, setNewAgentAudio] = useState<string | null>(null);
  const [editAgentAudio, setEditAgentAudio] = useState<string | null>(null);

  const [newAgent, setNewAgent] = useState({
    name: '', email: '', phone: '', role: '', team: 'Unassigned' as 'Assigned' | 'Unassigned'
  });

  const filteredAgents = agents.filter(agent => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = agent.name.toLowerCase().includes(searchLower) ||
                          agent.email.toLowerCase().includes(searchLower) ||
                          agent.phone.includes(searchQuery) ||
                          agent.role.toLowerCase().includes(searchLower);
    const matchesFilter = filterTeam === 'all' || agent.team === filterTeam;
    return matchesSearch && matchesFilter;
  });

  const handleSelectAll = () => {
    if (selectedAgents.length === filteredAgents.length) {
      setSelectedAgents([]);
    } else {
      setSelectedAgents(filteredAgents.map(agent => agent.id));
    }
  };

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgents(prev => prev.includes(agentId) ? prev.filter(id => id !== agentId) : [...prev, agentId]);
  };
  
  const handleDelete = (agentId: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
        setAgents(prev => prev.filter(agent => agent.id !== agentId));
        setSelectedAgents(prev => prev.filter(id => id !== agentId));
    }
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setEditAgentAudio(agent.audioUrl || null);
    setShowEditDialog(true);
  };

  const handleView = (agent: Agent) => {
    setViewingAgent(agent);
    setShowViewDialog(true);
  };
  
  const resetAddForm = () => {
      setShowAddDialog(false);
      setShowRecorder(false);
      setNewAgentAudio(null);
      setNewAgent({ name: '', email: '', phone: '', role: '', team: 'Unassigned' });
  }

  const handleAddAgent = () => {
    if (newAgent.name && newAgent.email && newAgent.phone && newAgent.role) {
      const agent: Agent = {
        id: Date.now().toString(),
        ...newAgent,
        audioUrl: newAgentAudio || undefined
      };
      setAgents(prev => [agent, ...prev]);
      resetAddForm();
    } else {
        alert("Please fill in all fields.");
    }
  };

  const handleUpdateAgent = () => {
    if (editingAgent) {
      setAgents(prev => prev.map(agent => 
        agent.id === editingAgent.id 
          ? { ...editingAgent, audioUrl: editAgentAudio || undefined } 
          : agent
      ));
      setEditingAgent(null);
      setEditAgentAudio(null);
      setShowEditDialog(false);
      setShowRecorder(false);
    }
  };

  const handleAudioSave = (audioBlob: Blob) => {
    const audioUrl = URL.createObjectURL(audioBlob);
    if (showAddDialog) setNewAgentAudio(audioUrl);
    else if (showEditDialog) setEditAgentAudio(audioUrl);
    setShowRecorder(false);
  };
  
  const renderDialog = (
    title: string, 
    agentState: any, 
    setAgentState: Function, 
    audioState: string | null,
    onSave: () => void, 
    onClose: () => void
    ) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        {showRecorder ? (
          <AudioRecorder onSave={handleAudioSave} onCancel={() => setShowRecorder(false)} />
        ) : (
          <div className="space-y-4">
            <input type="text" placeholder="Agent Name" value={agentState.name} onChange={(e) => setAgentState({...agentState, name: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10A4B0]" />
            <input type="email" placeholder="Email" value={agentState.email} onChange={(e) => setAgentState({...agentState, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10A4B0]" />
            <input type="tel" placeholder="Phone" value={agentState.phone} onChange={(e) => setAgentState({...agentState, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10A4B0]" />
            <input type="text" placeholder="Role" value={agentState.role} onChange={(e) => setAgentState({...agentState, role: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10A4B0]" />
            <select value={agentState.team} onChange={(e) => setAgentState({...agentState, team: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10A4B0]">
              <option value="Unassigned">Unassigned</option>
              <option value="Assigned">Assigned</option>
            </select>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-600">Audio Greeting:</span>
              <button onClick={() => setShowRecorder(true)} className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 font-semibold">
                <Mic className="w-4 h-4" /> <span>{audioState ? 'Record New' : 'Record Audio'}</span>
              </button>
            </div>
            {audioState && (
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg">
                <AudioPlayer audioUrl={audioState} />
              </div>
            )}
            <div className="flex space-x-4 pt-4">
              <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-full hover:bg-gray-300 font-semibold">Cancel</button>
              <button onClick={onSave} className="flex-1 bg-[#10A4B0] text-white py-2.5 rounded-full hover:bg-[#0D8A94] font-semibold">{title.startsWith("Add") ? "Add Agent" : "Save Changes"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#F6F6FA] min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
            {/* Header section for controls */}
            <div className="flex flex-wrap gap-4 items-center justify-between pb-5">
                <h1 className="text-2xl font-semibold text-[#10A4B0]">Agent Table</h1>
                <div className="flex flex-wrap gap-3 items-center">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search Here..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm w-48 focus:outline-none focus:ring-1 focus:ring-[#10A4B0]" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">Action <ChevronDown className="w-4 h-4"/></button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">Create Column <ChevronDown className="w-4 h-4"/></button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50">Filter <ChevronDown className="w-4 h-4"/></button>
                <button onClick={() => setShowAddDialog(true)} className="flex items-center space-x-2 bg-[#10A4B0] text-white px-4 py-2 rounded-md hover:bg-[#0D8A94] transition-colors">
                    <Plus className="w-5 h-5" /> <span className="font-semibold text-sm">Agent Table</span>
                </button>
                </div>
            </div>
            <hr className="border-gray-300 mb-6"/>

            {/* Table section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <div style={{minWidth: '1200px'}}>
                        {/* Table Header */}
                        <div className="grid grid-cols-[auto,1.5fr,2fr,1.5fr,1fr,1fr,1.2fr,1.2fr] gap-4 bg-gray-50 px-6 py-4 font-semibold text-sm text-[#495057] border-b border-gray-200">
                            <div className="flex items-center"><input type="checkbox" checked={selectedAgents.length === filteredAgents.length && filteredAgents.length > 0} onChange={handleSelectAll} className="w-4 h-4 accent-[#10A4B0]" /></div>
                            <div>Agent Name</div>
                            <div>Email</div>
                            <div>Phone</div>
                            <div>Role</div>
                            <div>Team</div>
                            <div>Audio</div>
                            <div className="text-center">Action</div>
                        </div>

                        {/* Table Body */}
                        <div>
                        {filteredAgents.map((agent) => (
                            <div key={agent.id} className="grid grid-cols-[auto,1.5fr,2fr,1.5fr,1fr,1fr,1.2fr,1.2fr] gap-4 px-6 py-4 items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 text-sm">
                            <div className="flex items-center"><input type="checkbox" checked={selectedAgents.includes(agent.id)} onChange={() => handleSelectAgent(agent.id)} className="w-4 h-4 accent-[#10A4B0]" /></div>
                            <div className="text-gray-800 font-medium">{agent.name}</div>
                            <div className="text-gray-600 truncate">{agent.email}</div>
                            <div className="text-gray-600">{agent.phone}</div>
                            <div className="text-gray-600">{agent.role}</div>
                            <div><span className={`px-4 py-1.5 rounded-full text-xs font-bold ${agent.team === 'Assigned' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{agent.team}</span></div>
                            <div>{agent.audioUrl ? <AudioPlayer audioUrl={agent.audioUrl} /> : <span className="text-gray-400 text-xs">No Audio</span>}</div>
                            <div className="flex items-center justify-center space-x-2">
                                <button onClick={() => handleView(agent)} className="p-2 bg-[#F0EFFF] rounded-lg hover:bg-purple-100 transition-colors"><Eye className="w-5 h-5 text-purple-600" /></button>
                                <button onClick={() => handleEdit(agent)} className="p-2 bg-[#E8F8F5] rounded-lg hover:bg-green-100 transition-colors"><Edit2 className="w-5 h-5 text-green-600" /></button>
                                <button onClick={() => handleDelete(agent.id)} className="p-2 bg-[#FFE2DF] rounded-lg hover:bg-red-100 transition-colors"><Trash2 className="w-5 h-5 text-red-600" /></button>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
      
            {/* --- Modals --- */}
            {showAddDialog && renderDialog("Add New Agent", newAgent, setNewAgent, newAgentAudio, handleAddAgent, resetAddForm)}
            {showEditDialog && editingAgent && renderDialog("Edit Agent", editingAgent, setEditingAgent, editAgentAudio, handleUpdateAgent, () => setShowEditDialog(false))}
            {showViewDialog && viewingAgent && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative animate-fade-in">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Agent Details</h2>
                <button 
                    onClick={() => setShowViewDialog(false)} 
                    className="text-gray-400 hover:text-gray-600 transition"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Body */}
            <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                <div><span className="font-medium text-gray-600">Name:</span> {viewingAgent.name}</div>
                <div><span className="font-medium text-gray-600">Email:</span> {viewingAgent.email}</div>
                <div><span className="font-medium text-gray-600">Phone:</span> {viewingAgent.phone}</div>
                <div><span className="font-medium text-gray-600">Role:</span> {viewingAgent.role}</div>
                <div>
                    <span className="font-medium text-gray-600">Team:</span>{" "}
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold 
                        ${viewingAgent.team === 'Assigned' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'}`}>
                        {viewingAgent.team}
                    </span>
                </div>
                {viewingAgent.audioUrl && (
                    <div className="pt-3">
                        <AudioPlayer audioUrl={viewingAgent.audioUrl} />
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
                <button 
                    onClick={() => setShowViewDialog(false)} 
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition px-5 py-2 rounded-full font-medium"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    </div>
  );
};