import jsPDF from 'jspdf';
import { DemoUser, Activity, Badge } from '@/types';

export class CertificateGenerator {
  private doc: jsPDF;

  constructor() {
    this.doc = new jsPDF();
  }

  generateCertificate(user: DemoUser): void {
    // PDF 초기화
    this.doc = new jsPDF();
    
    // 한글 폰트는 브라우저에서 제한적이므로 기본 폰트 사용
    this.doc.setFont('helvetica');
    
    // 헤더 섹션
    this.addHeader();
    
    // 사용자 정보 섹션
    this.addUserInfo(user);
    
    // 활동 내역 섹션
    this.addActivities(user.activities);
    
    // ESG 점수 요약 섹션
    this.addScoreSummary(user);
    
    // 배지 섹션
    this.addBadges(user.badges);
    
    // 푸터 섹션
    this.addFooter();
  }

  private addHeader(): void {
    // 제목
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('ESG Volunteer Certification', 105, 30, { align: 'center' });
    
    // 부제목
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('Gyeonggi Welfare Foundation', 105, 40, { align: 'center' });
    
    // 발급일
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.doc.setFontSize(12);
    this.doc.text(`Issue Date: ${currentDate}`, 105, 50, { align: 'center' });
    
    // 구분선
    this.doc.setLineWidth(0.5);
    this.doc.line(20, 60, 190, 60);
  }

  private addUserInfo(user: DemoUser): void {
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Volunteer Information', 20, 80);
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Name: ${user.name}`, 20, 90);
    this.doc.text(`Email: ${user.email}`, 20, 100);
    this.doc.text(`Total ESG Score: ${user.totalScore} points`, 20, 110);
    this.doc.text(`Total Activities: ${user.activities.length} completed`, 20, 120);
  }

  private addActivities(activities: Activity[]): void {
    let yPos = 140;
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Activity Records', 20, yPos);
    
    yPos += 15;
    
    // 테이블 헤더
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Date', 20, yPos);
    this.doc.text('Type', 50, yPos);
    this.doc.text('Activity', 70, yPos);
    this.doc.text('Score', 160, yPos);
    
    yPos += 5;
    this.doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    // 최근 5개 활동만 표시
    const recentActivities = activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    
    this.doc.setFont('helvetica', 'normal');
    
    recentActivities.forEach((activity) => {
      const formattedDate = new Date(activity.date).toLocaleDateString('en-US');
      const typeMap = { E: 'ENV', S: 'SOC', G: 'GOV' };
      
      this.doc.text(formattedDate, 20, yPos);
      this.doc.text(typeMap[activity.type], 50, yPos);
      
      // 긴 제목은 잘라내기
      const title = activity.title.length > 25 
        ? activity.title.substring(0, 25) + '...' 
        : activity.title;
      this.doc.text(title, 70, yPos);
      
      this.doc.text(`${activity.score}pt`, 160, yPos);
      
      yPos += 12;
      
      // 페이지 넘김 체크
      if (yPos > 250) {
        this.doc.addPage();
        yPos = 30;
      }
    });
    
    if (activities.length > 5) {
      yPos += 5;
      this.doc.setFontSize(9);
      this.doc.setFont('helvetica', 'italic');
      this.doc.text(`... and ${activities.length - 5} more activities`, 20, yPos);
    }
  }

  private addScoreSummary(user: DemoUser): void {
    let yPos = 200;
    
    // 페이지 넘김 체크
    if (yPos > 250) {
      this.doc.addPage();
      yPos = 30;
    }
    
    const esgScores = user.activities.reduce(
      (acc, activity) => {
        acc[activity.type] += activity.score;
        return acc;
      },
      { E: 0, S: 0, G: 0 }
    );
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('ESG Score Breakdown', 20, yPos);
    
    yPos += 15;
    
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Environmental (E): ${esgScores.E} points`, 20, yPos);
    yPos += 10;
    this.doc.text(`Social (S): ${esgScores.S} points`, 20, yPos);
    yPos += 10;
    this.doc.text(`Governance (G): ${esgScores.G} points`, 20, yPos);
    yPos += 10;
    
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`Total Score: ${user.totalScore} points`, 20, yPos + 5);
  }

  private addBadges(badges: Badge[]): void {
    let yPos = 240;
    
    // 페이지 넘김 체크
    if (yPos > 260) {
      this.doc.addPage();
      yPos = 30;
    }
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Achievement Badges', 20, yPos);
    
    yPos += 15;
    
    if (badges.length === 0) {
      this.doc.setFontSize(10);
      this.doc.setFont('helvetica', 'italic');
      this.doc.text('No badges earned yet. Keep volunteering to earn badges!', 20, yPos);
    } else {
      this.doc.setFontSize(12);
      this.doc.setFont('helvetica', 'normal');
      
      badges.forEach((badge) => {
        this.doc.text(`${badge.name} (Level ${badge.level})`, 20, yPos);
        yPos += 8;
        this.doc.setFontSize(10);
        this.doc.text(`${badge.description}`, 25, yPos);
        if (badge.unlockedAt) {
          this.doc.text(`Earned: ${new Date(badge.unlockedAt).toLocaleDateString('en-US')}`, 25, yPos + 6);
          yPos += 12;
        }
        yPos += 8;
        this.doc.setFontSize(12);
      });
    }
  }

  private addFooter(): void {
    // 새 페이지로 이동하지 않고 현재 페이지 하단에 추가
    const pageHeight = this.doc.internal.pageSize.height;
    let yPos = pageHeight - 40;
    
    // 구분선
    this.doc.setLineWidth(0.5);
    this.doc.line(20, yPos, 190, yPos);
    
    yPos += 10;
    
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text('This certificate is issued by Gyeonggi Welfare Foundation', 20, yPos);
    this.doc.text('ESG Volunteer Certification Platform (Demo Version)', 20, yPos + 8);
    
    // 데모 워터마크
    this.doc.setFontSize(40);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setTextColor(200, 200, 200);
    this.doc.text('DEMO', 105, 150, { 
      align: 'center',
      angle: -45 
    });
    
    // 색상 리셋
    this.doc.setTextColor(0, 0, 0);
  }

  download(filename: string = 'esg-volunteer-certificate.pdf'): void {
    this.doc.save(filename);
  }

  getBlob(): Blob {
    return this.doc.output('blob');
  }
}

export const generateAndDownloadCertificate = (user: DemoUser): void => {
  const generator = new CertificateGenerator();
  generator.generateCertificate(user);
  generator.download(`${user.name}-esg-certificate.pdf`);
};