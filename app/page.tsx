import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">欢迎回来 👋</h1>
        <p className="text-gray-500 mt-1">这里是你的创作控制台，额度、用量与快捷入口一目了然</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">剩余额度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold gradient-text">128</div>
            <p className="text-xs text-gray-400 mt-1">张图片</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">今日已生成</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">23</div>
            <p className="text-xs text-gray-400 mt-1">张图片 · 2 个视频</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">短剧项目</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-600">3</div>
            <p className="text-xs text-gray-400 mt-1">个进行中</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">素材库</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">456</div>
            <p className="text-xs text-gray-400 mt-1">张素材</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷入口</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/image" className="block">
            <Card className="border-gray-200 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold text-gray-900">图片工作台</h3>
                <p className="text-sm text-gray-500 mt-1">输入描述，立即生成产品图</p>
              </CardContent>
            </Card>
          </a>
          <a href="/storyboard" className="block">
            <Card className="border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🎬</div>
                <h3 className="font-semibold text-gray-900">分镜工作台</h3>
                <p className="text-sm text-gray-500 mt-1">剧本拆解、短剧制作</p>
              </CardContent>
            </Card>
          </a>
          <a href="/reverse" className="block">
            <Card className="border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-semibold text-gray-900">提示词反推</h3>
                <p className="text-sm text-gray-500 mt-1">看别人的图，反推怎么做</p>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>

      {/* Usage */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900">每日额度</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "1K 图片", used: 23, total: 50, color: "from-violet-500 to-indigo-500" },
              { label: "2K 高清", used: 8, total: 20, color: "from-blue-500 to-cyan-500" },
              { label: "4K 超清", used: 2, total: 5, color: "from-pink-500 to-rose-500" },
              { label: "视频生成", used: 2, total: 5, color: "from-green-500 to-emerald-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.used} / {item.total}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.used / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
