package com.toone.itop.formula.rule.inte;

import java.util.Map;

import com.toone.itop.formula.spi.Func;
import com.toone.itop.formula.spi.Function;
import com.toone.itop.rule.apiserver.model.RuleContext;
import com.toone.itop.rule.spiserver.AbstractRule;
import com.toone.util.JsonUtils;
import com.toone.vcore.component.annotations.Component;
import com.toone.vcore.component.annotations.Instantiate;
import com.toone.vcore.component.annotations.Provides;

@Component
@Provides(specifications = Function.class)
@Instantiate
@Func(name = "DemoConsolePrint")
public class DemoConsolePrint extends AbstractRule {

	@Override
	public Object evaluate(RuleContext context) {
		Map<String, Object> ruleCfgParams = (Map<String, Object>) context.getRuleConfig().getConfigParams();
		Map<String, Object> runtimeParams = context.getInputParams();

		String json = JsonUtils.toJson(ruleCfgParams);
		System.out.println("DemoConsolePrint:"+json);
		return null;
	}

}