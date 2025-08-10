import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
          
          <div className="mt-4">
            <Link
              href="/demo"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              데모 시작하기
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>ESG 연계 자원봉사 인증 플랫폼</p>
          <p>[경기복지재단] 2026년 신규사업 발굴 아이디어 공모전 출품작</p>
        </div>
      </div>
    </div>
  )
}