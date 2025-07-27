import jsPDF from 'jspdf';

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

export const generatePDF = async (data: FormData) => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Set colors to match the screenshot exactly
    const lightBlue = [173, 216, 230]; // Light blue background
    const darkBlue = [70, 130, 180]; // Dark blue for headers
    const black = [0, 0, 0];
    const white = [255, 255, 255];

    // Draw outer border
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.rect(10, 10, 190, 270);

    // Title section with blue background
    pdf.setFillColor(...lightBlue);
    pdf.rect(10, 10, 190, 12, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, 10, 190, 12);

    // Add expand icon (small square with +)
    pdf.rect(12, 12, 3, 3);
    pdf.setFontSize(6);
    pdf.text('+', 13, 14.5);

    // Title text
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(...darkBlue);
    pdf.text('Programming Code\\Project marking criteria', 18, 18);

    // Basic Information Table - exactly as shown in screenshot
    let currentY = 25;

    // First row: Course Code and Course Name headers
    pdf.setFillColor(...white);
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, currentY, 40, 8);
    pdf.rect(50, currentY, 40, 8);
    pdf.rect(90, currentY, 40, 8);
    pdf.rect(130, currentY, 40, 8);
    pdf.rect(170, currentY, 30, 8);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...black);
    pdf.text('Course Code:', 12, currentY + 5);
    pdf.text('Course', 92, currentY + 3);
    pdf.text('Name:', 92, currentY + 6);

    // Second row: Values for Course Code and Course Name
    currentY += 8;
    pdf.rect(10, currentY, 40, 8);
    pdf.rect(50, currentY, 40, 8);
    pdf.rect(90, currentY, 40, 8);
    pdf.rect(130, currentY, 40, 8);
    pdf.rect(170, currentY, 30, 8);

    pdf.setFont('helvetica', 'normal');
    pdf.text(data.courseCode || 'XXXXX', 12, currentY + 5);
    pdf.text(data.courseName || 'XXXXX', 92, currentY + 5);

    // Third row: Student Name and Student ID headers
    currentY += 8;
    pdf.rect(10, currentY, 40, 8);
    pdf.rect(50, currentY, 40, 8);
    pdf.rect(90, currentY, 40, 8);
    pdf.rect(130, currentY, 40, 8);
    pdf.rect(170, currentY, 30, 8);

    pdf.setFont('helvetica', 'bold');
    pdf.text('Student', 12, currentY + 3);
    pdf.text('Name:', 12, currentY + 6);
    pdf.text('Student', 172, currentY + 3);
    pdf.text('ID:', 172, currentY + 6);

    // Fourth row: Values for Student Name and Student ID
    currentY += 8;
    pdf.rect(10, currentY, 40, 8);
    pdf.rect(50, currentY, 40, 8);
    pdf.rect(90, currentY, 40, 8);
    pdf.rect(130, currentY, 40, 8);
    pdf.rect(170, currentY, 30, 8);

    pdf.setFont('helvetica', 'normal');
    pdf.text(data.studentName || 'XXXXX', 12, currentY + 5);
    pdf.text(data.studentId || 'XXXXXX', 172, currentY + 5);

    // Main grading table - exactly matching the screenshot layout
    currentY += 15;

    // Grade headers row
    const gradeHeaders = [
        'A (89-100)',
        'B (76-88)',
        'C (67-75)',
        'D (60-66)',
        'F (0-59)',
    ];
    const colWidth = 28;
    const numSubdivisions = 4; // Each grade has 4 subdivision columns
    const subColWidth = colWidth / numSubdivisions;

    // Draw grade header cells with alternating colors
    for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) {
            pdf.setFillColor(...lightBlue);
        } else {
            pdf.setFillColor(220, 235, 255);
        }
        pdf.rect(50 + i * colWidth, currentY, colWidth, 10, 'F');
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(50 + i * colWidth, currentY, colWidth, 10);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7);
        pdf.setTextColor(...black);
        pdf.text(gradeHeaders[i], 52 + i * colWidth, currentY + 6);
    }

    currentY += 10;

    // Score numbers row - showing specific scores within each grade
    const scoreSubdivisions = [
        [100, 96, 92, 89], // A grade subdivisions
        [88, 84, 80, 76], // B grade subdivisions
        [75, 72, 69, 67], // C grade subdivisions
        [66, 64, 62, 60], // D grade subdivisions
        [59, 40, 20, 0], // F grade subdivisions
    ];

    for (let i = 0; i < 5; i++) {
        const subdivisions = scoreSubdivisions[i];
        const subColWidth = colWidth / subdivisions.length;

        // Create subdivision columns with score numbers
        for (let j = 0; j < subdivisions.length; j++) {
            if (i % 2 === 0) {
                pdf.setFillColor(...lightBlue);
            } else {
                pdf.setFillColor(220, 235, 255);
            }
            pdf.rect(
                50 + i * colWidth + j * subColWidth,
                currentY,
                subColWidth,
                8,
                'F'
            );
            pdf.setDrawColor(0, 0, 0);
            pdf.rect(
                50 + i * colWidth + j * subColWidth,
                currentY,
                subColWidth,
                8
            );

            // Add score numbers
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(6);
            pdf.setTextColor(...black);
            pdf.text(
                subdivisions[j].toString(),
                52 + i * colWidth + j * subColWidth,
                currentY + 5
            );
        }
    }

    currentY += 8;

    // Implementation & Functions row
    pdf.setFillColor(...lightBlue);
    pdf.rect(10, currentY, 40, 50, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, currentY, 40, 50);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.text('Implementation &', 12, currentY + 8);
    pdf.text('Functions (40%)', 12, currentY + 15);

    // Implementation description and marking boxes
    for (let i = 0; i < 5; i++) {
        const subdivisions = scoreSubdivisions[i];
        const subColWidth = colWidth / subdivisions.length;

        // Large description box first
        if (i % 2 === 0) {
            pdf.setFillColor(...lightBlue);
        } else {
            pdf.setFillColor(220, 235, 255);
        }
        pdf.rect(50 + i * colWidth, currentY, colWidth, 42, 'F');
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(50 + i * colWidth, currentY, colWidth, 42);

        // Create subdivision columns for score selection (empty boxes for marking) below description
        for (let j = 0; j < subdivisions.length; j++) {
            pdf.setFillColor(...white);
            pdf.rect(
                50 + i * colWidth + j * subColWidth,
                currentY + 42,
                subColWidth,
                8,
                'F'
            );
            pdf.setDrawColor(0, 0, 0);
            pdf.rect(
                50 + i * colWidth + j * subColWidth,
                currentY + 42,
                subColWidth,
                8
            );
            // No text - these are empty boxes for marking with dots
        }
    }

    // Implementation descriptions
    const implDescriptions = [
        '• All functions in program are relevant and correctly structured and implemented',
        '• Functions in program are correctly structured and implemented but there are no missing issues or functions or minor deviations',
        '• Some Functions in program are not correctly structured and implemented. • There are some missing issues or major deviations',
        '• Many functions are not correctly structured and implemented. • There are many missing issues or major deviations',
        '• Most functions are incorrect • There are major deviations in most of the implemented functions.',
    ];

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(5);

    for (let i = 0; i < 5; i++) {
        const lines = pdf.splitTextToSize(implDescriptions[i], colWidth - 3);
        pdf.text(lines, 51 + i * colWidth, currentY + 12);
    }

    currentY += 58; // 42 for description + 8 for marking boxes + 8 spacing

    // Testing & Test Cases row
    pdf.setFillColor(...lightBlue);
    pdf.rect(10, currentY, 40, 50, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, currentY, 40, 50);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.text('Testing &', 12, currentY + 8);
    pdf.text('Test Cases (40%)', 12, currentY + 15);

    // Testing description and marking boxes
    for (let i = 0; i < 5; i++) {
        const subdivisions = scoreSubdivisions[i];
        const subColWidth = colWidth / subdivisions.length;

        // Large description box first
        if (i % 2 === 0) {
            pdf.setFillColor(...lightBlue);
        } else {
            pdf.setFillColor(220, 235, 255);
        }
        pdf.rect(50 + i * colWidth, currentY, colWidth, 42, 'F');
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(50 + i * colWidth, currentY, colWidth, 42);

        // Create subdivision columns for score selection (empty boxes for marking) below description
        for (let j = 0; j < subdivisions.length; j++) {
            pdf.setFillColor(...white);
            pdf.rect(
                50 + i * colWidth + j * subColWidth,
                currentY + 42,
                subColWidth,
                8,
                'F'
            );
            pdf.setDrawColor(0, 0, 0);
            pdf.rect(
                50 + i * colWidth + j * subColWidth,
                currentY + 42,
                subColWidth,
                8
            );
            // No text - these are empty boxes for marking with dots
        }
    }

    // Testing descriptions
    const testDescriptions = [
        '• The program can pass all test cases correctly.',
        '• The program can pass most of test cases correctly.',
        '• The program can pass only some of test cases correctly.',
        '• The program can pass only few of test cases correctly.',
        "• The program cannot run most of the test cases or there are syntax errors such that the program doesn't run at all.",
    ];

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(5);

    for (let i = 0; i < 5; i++) {
        const lines = pdf.splitTextToSize(testDescriptions[i], colWidth - 3);
        pdf.text(lines, 51 + i * colWidth, currentY + 12);
    }

    currentY += 58; // 42 for description + 8 for marking boxes + 8 spacing

    // Clean Code row
    pdf.setFillColor(...lightBlue);
    pdf.rect(10, currentY, 40, 50, 'F');
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, currentY, 40, 50);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.text('Clean Code', 12, currentY + 8);
    pdf.text('(20%)', 12, currentY + 15);

    // Clean Code description and marking boxes
    for (let i = 0; i < 5; i++) {
        const subdivisions = scoreSubdivisions[i];
        const subColWidth = colWidth / subdivisions.length;

        // Large description box first
        if (i % 2 === 0) {
            pdf.setFillColor(...lightBlue);
        } else {
            pdf.setFillColor(220, 235, 255);
        }
        pdf.rect(50 + i * colWidth, currentY, colWidth, 42, 'F');
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(50 + i * colWidth, currentY, colWidth, 42);

        // Create subdivision columns for score selection (empty boxes for marking) below description
        for (let j = 0; j < subdivisions.length; j++) {
            pdf.setFillColor(...white);
            pdf.rect(
                50 + i * colWidth + j * subColWidth,
                currentY + 42,
                subColWidth,
                8,
                'F'
            );
            pdf.setDrawColor(0, 0, 0);
            pdf.rect(
                50 + i * colWidth + j * subColWidth,
                currentY + 42,
                subColWidth,
                8
            );
            // No text - these are empty boxes for marking with dots
        }
    }

    // Clean Code descriptions
    const codeDescriptions = [
        '• The written code follows the guidelines of clean code',
        '• The written code almost follows the guidelines of clean code',
        '• The written code partially follows the guidelines of clean code',
        '• Low ability to follow guidelines of clean code',
        "• The program doesn't follow any guidelines of clean code",
    ];

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(5);

    for (let i = 0; i < 5; i++) {
        const lines = pdf.splitTextToSize(codeDescriptions[i], colWidth - 3);
        pdf.text(lines, 51 + i * colWidth, currentY + 12);
    }

    currentY += 60;

    // Bottom section - exactly matching the screenshot
    pdf.setFillColor(220, 235, 255);

    // First row
    pdf.rect(10, currentY, 50, 10, 'F');
    pdf.rect(60, currentY, 30, 10, 'F');
    pdf.rect(90, currentY, 50, 10, 'F');
    pdf.rect(140, currentY, 30, 10, 'F');
    pdf.rect(170, currentY, 20, 10, 'F');
    pdf.rect(190, currentY, 10, 10, 'F');

    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, currentY, 50, 10);
    pdf.rect(60, currentY, 30, 10);
    pdf.rect(90, currentY, 50, 10);
    pdf.rect(140, currentY, 30, 10);
    pdf.rect(170, currentY, 20, 10);
    pdf.rect(190, currentY, 10, 10);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.text('1st marker Total', 12, currentY + 6);
    pdf.text('1st marker Signature', 92, currentY + 6);
    pdf.text('ASU Agreed', 142, currentY + 4);
    pdf.text('Mark', 147, currentY + 7);

    pdf.setFont('helvetica', 'normal');
    pdf.text((data.firstMarkerTotal || 'XXXXX').toString(), 65, currentY + 6);
    pdf.text(data.firstMarkerSignature || 'XXXX', 145, currentY + 6);
    pdf.text((data.asuAgreedMark || 'XX').toString(), 193, currentY + 6);

    currentY += 10;

    // Second row
    pdf.setFillColor(220, 235, 255);
    pdf.rect(10, currentY, 50, 10, 'F');
    pdf.rect(60, currentY, 30, 10, 'F');
    pdf.rect(90, currentY, 50, 10, 'F');
    pdf.rect(140, currentY, 30, 10, 'F');
    pdf.rect(170, currentY, 20, 10, 'F');
    pdf.rect(190, currentY, 10, 10, 'F');

    pdf.setDrawColor(0, 0, 0);
    pdf.rect(10, currentY, 50, 10);
    pdf.rect(60, currentY, 30, 10);
    pdf.rect(90, currentY, 50, 10);
    pdf.rect(140, currentY, 30, 10);
    pdf.rect(170, currentY, 20, 10);
    pdf.rect(190, currentY, 10, 10);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.text('2nd marker Total', 12, currentY + 6);
    pdf.text('2nd marker Signature', 92, currentY + 6);
    pdf.text('UEL Agreed', 142, currentY + 4);
    pdf.text('Mark', 147, currentY + 7);

    pdf.setFont('helvetica', 'normal');
    pdf.text((data.secondMarkerTotal || 'XXXXX').toString(), 65, currentY + 6);
    pdf.text(data.secondMarkerSignature || 'XXXXX', 145, currentY + 6);
    pdf.text((data.uelAgreedMark || 'XXXX').toString(), 193, currentY + 6);

    // Save the PDF
    pdf.save('marking-criteria.pdf');
};
