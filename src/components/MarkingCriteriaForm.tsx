'use client';

import React, { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

interface FormData {
    courseCode: string;
    courseName: string;
    studentName: string;
    studentId: string;

    // Implementation scores (0-100)
    implementationA: number;
    implementationB: number;
    implementationC: number;
    implementationD: number;
    implementationF: number;

    // Testing scores (0-100)
    testingA: number;
    testingB: number;
    testingC: number;
    testingD: number;
    testingF: number;

    // Code Quality scores (0-100)
    codeQualityA: number;
    codeQualityB: number;
    codeQualityC: number;
    codeQualityD: number;
    codeQualityF: number;

    // Totals
    firstMarkerTotal: number;
    secondMarkerTotal: number;
    firstMarkerSignature: string;
    secondMarkerSignature: string;
    asuAgreedMark: number;
    uelAgreedMark: number;
}

const MarkingCriteriaForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        courseCode: '',
        courseName: '',
        studentName: '',
        studentId: '',
        implementationA: 0,
        implementationB: 0,
        implementationC: 0,
        implementationD: 0,
        implementationF: 0,
        testingA: 0,
        testingB: 0,
        testingC: 0,
        testingD: 0,
        testingF: 0,
        codeQualityA: 0,
        codeQualityB: 0,
        codeQualityC: 0,
        codeQualityD: 0,
        codeQualityF: 0,
        firstMarkerTotal: 0,
        secondMarkerTotal: 0,
        firstMarkerSignature: '',
        secondMarkerSignature: '',
        asuAgreedMark: 0,
        uelAgreedMark: 0,
    });

    const handleInputChange = (
        field: keyof FormData,
        value: string | number
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleGeneratePDF = async () => {
        try {
            await generatePDF(formData);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Programming Code/Project Marking Criteria Generator
            </h1>

            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Course Code:
                    </label>
                    <input
                        type="text"
                        value={formData.courseCode}
                        onChange={(e) =>
                            handleInputChange('courseCode', e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="XXXXX"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Course Name:
                    </label>
                    <input
                        type="text"
                        value={formData.courseName}
                        onChange={(e) =>
                            handleInputChange('courseName', e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="XXXXX"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Student Name:
                    </label>
                    <input
                        type="text"
                        value={formData.studentName}
                        onChange={(e) =>
                            handleInputChange('studentName', e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="XXXXX"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Student ID:
                    </label>
                    <input
                        type="text"
                        value={formData.studentId}
                        onChange={(e) =>
                            handleInputChange('studentId', e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="XXXXXX"
                    />
                </div>
            </div>

            {/* Scoring Sections */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Implementation & Functions (40%)
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            A (89-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.implementationA}
                            onChange={(e) =>
                                handleInputChange(
                                    'implementationA',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            B (76-88)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.implementationB}
                            onChange={(e) =>
                                handleInputChange(
                                    'implementationB',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            C (67-75)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.implementationC}
                            onChange={(e) =>
                                handleInputChange(
                                    'implementationC',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            D (60-66)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.implementationD}
                            onChange={(e) =>
                                handleInputChange(
                                    'implementationD',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            F (0-59)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.implementationF}
                            onChange={(e) =>
                                handleInputChange(
                                    'implementationF',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Testing & Test Cases (40%)
                </h3>
                <div className="grid grid-cols-5 gap-2">
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            A (89-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.testingA}
                            onChange={(e) =>
                                handleInputChange(
                                    'testingA',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            B (76-88)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.testingB}
                            onChange={(e) =>
                                handleInputChange(
                                    'testingB',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            C (67-75)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.testingC}
                            onChange={(e) =>
                                handleInputChange(
                                    'testingC',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            D (60-66)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.testingD}
                            onChange={(e) =>
                                handleInputChange(
                                    'testingD',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            F (0-59)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.testingF}
                            onChange={(e) =>
                                handleInputChange(
                                    'testingF',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Clean Code (20%)</h3>
                <div className="grid grid-cols-5 gap-2">
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            A (89-100)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.codeQualityA}
                            onChange={(e) =>
                                handleInputChange(
                                    'codeQualityA',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            B (76-88)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.codeQualityB}
                            onChange={(e) =>
                                handleInputChange(
                                    'codeQualityB',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            C (67-75)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.codeQualityC}
                            onChange={(e) =>
                                handleInputChange(
                                    'codeQualityC',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            D (60-66)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.codeQualityD}
                            onChange={(e) =>
                                handleInputChange(
                                    'codeQualityD',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1">
                            F (0-59)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={formData.codeQualityF}
                            onChange={(e) =>
                                handleInputChange(
                                    'codeQualityF',
                                    parseInt(e.target.value) || 0
                                )
                            }
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Totals and Signatures */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        1st Marker Total:
                    </label>
                    <input
                        type="number"
                        value={formData.firstMarkerTotal}
                        onChange={(e) =>
                            handleInputChange(
                                'firstMarkerTotal',
                                parseInt(e.target.value) || 0
                            )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        2nd Marker Total:
                    </label>
                    <input
                        type="number"
                        value={formData.secondMarkerTotal}
                        onChange={(e) =>
                            handleInputChange(
                                'secondMarkerTotal',
                                parseInt(e.target.value) || 0
                            )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        1st Marker Signature:
                    </label>
                    <input
                        type="text"
                        value={formData.firstMarkerSignature}
                        onChange={(e) =>
                            handleInputChange(
                                'firstMarkerSignature',
                                e.target.value
                            )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        2nd Marker Signature:
                    </label>
                    <input
                        type="text"
                        value={formData.secondMarkerSignature}
                        onChange={(e) =>
                            handleInputChange(
                                'secondMarkerSignature',
                                e.target.value
                            )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        ASU Agreed Mark:
                    </label>
                    <input
                        type="number"
                        value={formData.asuAgreedMark}
                        onChange={(e) =>
                            handleInputChange(
                                'asuAgreedMark',
                                parseInt(e.target.value) || 0
                            )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        UEL Agreed Mark:
                    </label>
                    <input
                        type="number"
                        value={formData.uelAgreedMark}
                        onChange={(e) =>
                            handleInputChange(
                                'uelAgreedMark',
                                parseInt(e.target.value) || 0
                            )
                        }
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>

            {/* Generate PDF Button */}
            <div className="text-center">
                <button
                    onClick={handleGeneratePDF}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                    Generate PDF
                </button>
            </div>
        </div>
    );
};

export default MarkingCriteriaForm;
