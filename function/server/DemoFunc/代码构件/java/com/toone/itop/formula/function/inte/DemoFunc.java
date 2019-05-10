package com.toone.itop.formula.function.inte;
import java.util.List;

import com.toone.itop.formula.spi.Func;
import com.toone.itop.formula.spi.Function;
import com.toone.itop.systemlog.api.Logger;
import com.toone.itop.systemlog.api.LoggerFactory;
import com.toone.vcore.component.annotations.Component;
import com.toone.vcore.component.annotations.Instantiate;
import com.toone.vcore.component.annotations.Provides;
/**
 * 
 *
 */
@Component
@Provides(specifications = Function.class)
@Instantiate
@Func(name = "DemoFunc")
public class DemoFunc implements Function {
	private Logger log = LoggerFactory.getLogger(DemoFunc.class);
	@Override
	public Object evaluate(List args) {
		if(args.size()>=2){
			
			double param1 = Double.parseDouble(args.get(0).toString());
			double param2 = Double.parseDouble(args.get(1).toString());
			
			return param1+param2;
		}
		return null;
	}
}
