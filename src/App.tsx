import { useState } from 'react';
import { Upload, FileText } from 'react-feather';
import { SlideOver } from './components/SlideOver';
import { DocumentSkeleton } from './components/Skeleton';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    // Simulate file upload and document processing
    setTimeout(() => {
      setDocuments((prev) => [
        ...prev,
        {
          id: Date.now(),
          filename: file.name,
          type: file.type.split('/')[1].toUpperCase(),
          created_at: new Date(),
          summary: 'This is a sample summary of the document.',
          content: 'This is a preview of the document content...',
        },
      ]);
      setFile(null);
      setUploading(false);
    }, 2000);
  };

  const handleViewDocument = (doc: any) => {
    setSelectedDoc(doc);
    setSlideOverOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Legal Document Manager
          </h1>
          <p className="text-gray-600">
            Upload and manage your legal documents with AI-powered analysis
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Upload className="text-blue-600" size={28} />
            Upload Document
          </h2>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FileText className="text-gray-400 mb-4" size={48} />
                <span className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload or drag and drop
                </span>
                <span className="text-sm text-gray-500">
                  PDF, DOC, DOCX, or TXT (max 10MB)
                </span>
              </label>
            </div>

            {file && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-600" size={24} />
                  <span className="font-medium text-gray-800">{file.name}</span>
                </div>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Documents
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DocumentSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">
                No documents uploaded yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="text-blue-600" size={32} />
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {doc.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg truncate">
                    {doc.filename}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleViewDocument(doc)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SlideOver for document details */}
      <SlideOver
        isOpen={slideOverOpen}
        onClose={() => setSlideOverOpen(false)}
        title={selectedDoc?.filename || 'Document Details'}
      >
        {selectedDoc && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Document Type
              </h3>
              <p className="text-lg text-gray-900">{selectedDoc.type}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Upload Date
              </h3>
              <p className="text-lg text-gray-900">
                {new Date(selectedDoc.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Summary
              </h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                {selectedDoc.summary || 'No summary available'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Content Preview
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {selectedDoc.content?.substring(0, 1000)}...
                </pre>
              </div>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}

export default App;